import React, { useEffect, useState } from 'react';
import EquipmentFetcher, {
  EquipmentData,
} from '../../util/api/equipment/equipment';
import { useUser } from '../../util/contexts/user_context';
import LoadingScreen from '../util/loading_screen';
import EquipmentForm from './equipment_form';

type Props = {
  id: number;
};

export default function EquipmentScreen({ id }: Props) {
  const [equipment, equipmentHandler] = useState<EquipmentData | null>(null);
  const [starting, startHandler] = useState(true);
  const currentUser = useUser();

  useEffect(() => {
    const getEquipmentData = async () => {
      if (!(id > 0)) {
        equipmentHandler(null);
        startHandler(false);
        return;
      }

      try {
        const fetcher = new EquipmentFetcher(currentUser.fetcher);
        const data = await fetcher.getEquipmentData(id);

        equipmentHandler(data);
      } catch (e) {
        equipmentHandler(null);
      } finally {
        startHandler(false);
      }
    };

    startHandler(true);
    getEquipmentData();
  }, [currentUser.fetcher, id]);

  if (starting) {
    return <LoadingScreen />;
  }

  return (
    <>
      <EquipmentForm data={equipment || undefined} />
    </>
  );
}
