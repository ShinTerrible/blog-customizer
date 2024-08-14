import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import {
	ArticleStateType,
	backgroundColors,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import clsx from 'clsx';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState(selectArticleState: ArticleStateType): void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef(null);
	const [selectArticleState, setSelectArticleState] =
		useState<ArticleStateType>(currentArticleState);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectArticleState({ ...selectArticleState, [key]: value });
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
		event: 'mousedown',
	});

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} OnClick={setIsOpen} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={(event) => {
						event.preventDefault(), setCurrentArticleState(selectArticleState);
					}}>
					<span className={styles.header}>Задайте параметры</span>
					<Select
						options={fontFamilyOptions}
						placeholder={selectArticleState.fontFamilyOption.toString()}
						selected={selectArticleState.fontFamilyOption}
						onChange={(option) => handleChange('fontFamilyOption', option)}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSizeOption'
						options={fontSizeOptions}
						selected={selectArticleState.fontSizeOption}
						onChange={(option) => handleChange('fontSizeOption', option)}
						title='Размер Шрифта'
					/>

					<Select
						options={fontColors}
						selected={selectArticleState.fontColor}
						onChange={(option) => handleChange('fontColor', option)}
						title='Цвет Шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={selectArticleState.backgroundColor}
						onChange={(option) => handleChange('backgroundColor', option)}
						title='Цвет Фона'
					/>
					<Select
						options={fontSizeOptions}
						selected={selectArticleState.fontSizeOption}
						onChange={(option) => handleChange('fontSizeOption', option)}
						title='Ширина Контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={() => {
								setCurrentArticleState(defaultArticleState);
							}}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
