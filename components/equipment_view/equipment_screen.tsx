import React, { useEffect, useMemo, useState } from 'react';
import EquipmentFetcher, {
  EquipmentData,
} from '../../util/api/equipment/equipment';
import { useUser } from '../../util/contexts/user_context';
import LoadingScreen from '../util/loading_screen';
import NotFoundScreen from '../util/not_found_screen';
import EquipmentDataView from './equipment_data';

type Props = {
  id: number;
  onSuccess?: () => void;
};

export default function EquipmentScreen({ id }: Props) {
  const [equipment, equipmentHandler] = useState<EquipmentData | null>(null);
  const [loading, loadHandler] = useState(false);
  const currentUser = useUser();

  const fetcher = useMemo(() => new EquipmentFetcher(currentUser.fetcher), [
    currentUser.fetcher,
  ]);

  useEffect(() => {
    const getEquipmentData = async () => {
      loadHandler(true);
      try {
        const data = await fetcher.getEquipmentData(id);

        equipmentHandler(data);
      } catch (e) {
        equipmentHandler(null);
      } finally {
        loadHandler(false);
      }
    };

    getEquipmentData();
  }, [fetcher, id]);

  if (loading) {
    return <LoadingScreen />;
  }
  if (equipment == null) {
    return <NotFoundScreen />;
  }

  return <EquipmentDataView data={equipment} />;
}
