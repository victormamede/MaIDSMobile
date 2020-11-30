import { Card } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { Lang, useLang } from '../../util/contexts/lang_context';
import SettingsForm, { Inputs } from './settings_form';

type Props = {
  onUpdate?: () => void;
};

export default function SettingsScreen({ onUpdate }: Props) {
  const { currentLang, changeLang } = useLang();
  const [loading, loadHandler] = useState(false);
  const [values, valueHandler] = useState<Inputs>({
    language: Lang.EN,
  });

  useEffect(() => {
    loadHandler(true);
    (async () => {
      valueHandler({
        language: currentLang,
      });
      loadHandler(false);
    })();
  }, [currentLang]);

  const onSubmit = async (data: Inputs) => {
    changeLang(data.language);

    onUpdate && onUpdate();
  };

  return (
    <Card>
      <SettingsForm
        currentValues={values}
        onSubmit={onSubmit}
        loading={loading}
      />
    </Card>
  );
}
