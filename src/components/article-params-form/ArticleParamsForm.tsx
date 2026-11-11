import { clsx } from 'clsx';
import { useState, useEffect, useRef } from 'react';
import {
  defaultArticleState,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type TArticleParamsFormProps = {
  articleState: ArticleStateType;
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  articleState,
  onApply,
}: TArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const [formState, setFormState] = useState<ArticleStateType>(articleState);

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFormState(articleState);
  }, [articleState]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent): void => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onApply(formState);
    setIsOpen(false);
  };

  const handleReset = (e: React.FormEvent): void => {
    e.preventDefault();
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={(): void => setIsOpen(!isOpen)} />

      <aside
        ref={sidebarRef}
        className={clsx(styles.container, { [styles.container_open]: isOpen })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>

          <Select
            title="Шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(option) =>
              setFormState({ ...formState, fontFamilyOption: option })
            }
          />
          <Separator />

          <RadioGroup
            title="Размер шрифта"
            name="fontSize"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={(option) => setFormState({ ...formState, fontSizeOption: option })}
          />
          <Separator />

          <Select
            title="Ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={(option) => setFormState({ ...formState, contentWidth: option })}
          />
          <Separator />

          <RadioGroup
            title="Цвет шрифта"
            name="fontColor"
            options={fontColors}
            selected={formState.fontColor}
            onChange={(option) => setFormState({ ...formState, fontColor: option })}
          />
          <Separator />

          <RadioGroup
            title="Цвет фона"
            name="backgroundColor"
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={(option) =>
              setFormState({ ...formState, backgroundColor: option })
            }
          />
          <Separator />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
