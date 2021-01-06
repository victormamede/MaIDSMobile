import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { StyleSheet } from 'react-native';
import EquipmentFetcher, {
  EquipmentData,
} from '../../util/api/equipment/equipment';
import { useUser } from '../../util/contexts/user_context';
import { differentEntries } from '../../util/helper/objects';
import ConfirmationScreen from '../util/confirmation_screen';
import LoadingScreen from '../util/loading_screen';
import NotFoundScreen from '../util/not_found_screen';
import EquipmentForm from './equipment_form';

type Props = {
  id: number;
  onSuccess?: () => void;
};

type State = {
  equipment: EquipmentData | null;
  equipmentFound: boolean;
  started: boolean;
  loading: boolean;
  error?: string;
};

type Action =
  | {
      type: 'setLoading';
      value: boolean;
    }
  | {
      type: 'setEquipment';
      equipment: EquipmentData | null;
    }
  | {
      type: '404';
    }
  | {
      type: 'error';
      message: string;
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setLoading':
      return { ...state, loading: action.value };
    case 'setEquipment':
      return {
        ...state,
        equipment: action.equipment,
        equipmentFound: true,
        started: true,
        loading: false,
      };
    case '404':
      return {
        ...state,
        equipment: null,
        equipmentFound: false,
        started: true,
        loading: false,
      };
    case 'error':
      return { ...state, error: action.message };
  }
}
const defaultState: State = {
  equipment: null,
  equipmentFound: false,
  started: false,
  loading: true,
};

export default function EquipmentScreen({ id, onSuccess }: Props) {
  const [
    { equipment, equipmentFound, started, loading, error },
    dispatch,
  ] = useReducer(reducer, defaultState);
  const [confirmDelete, confirmDeleteHandler] = useState(false);
  const currentUser = useUser();

  const fetcher = useMemo(() => new EquipmentFetcher(currentUser.fetcher), [
    currentUser.fetcher,
  ]);

  useEffect(() => {
    const getEquipmentData = async () => {
      if (id === 0) {
        dispatch({ type: 'setEquipment', equipment: null });
        return;
      }

      try {
        const data = await fetcher.getEquipmentData(id);

        dispatch({ type: 'setEquipment', equipment: data });
      } catch (e) {
        dispatch({ type: '404' });
      }
    };

    getEquipmentData();
  }, [fetcher, id]);

  if (!started) {
    return <LoadingScreen />;
  }
  if (!equipmentFound) {
    return <NotFoundScreen />;
  }

  async function tryAndExec<T>(func: () => T | Promise<T>) {
    dispatch({ type: 'setLoading', value: true });

    try {
      const value = await func();
      dispatch({ type: 'setLoading', value: false });
      onSuccess && onSuccess();
      return value;
    } catch (e) {
      dispatch({ type: 'error', message: e.message });
      dispatch({ type: 'setLoading', value: false });
    }
  }

  const updateEquipment = async (props: EquipmentData) => {
    if (equipment == null) {
      return;
    }

    const changed = differentEntries(equipment, props);
    tryAndExec(
      async () => await fetcher.updateEquipment(equipment.id, changed),
    );
  };

  const createEquipment = async (props: EquipmentData) => {
    if (equipment != null) {
      return;
    }

    tryAndExec(async () => await fetcher.createEquipment(props));
  };

  const deleteEquipment = async () => {
    if (equipment == null) {
      return;
    }
    confirmDeleteHandler(false);
    tryAndExec(async () => await fetcher.deleteEquipment(equipment));
  };

  return (
    <>
      <ConfirmationScreen
        disabled={loading}
        visible={confirmDelete}
        onConfirm={deleteEquipment}
        onReject={() => confirmDeleteHandler(false)}
      />
      <EquipmentForm
        style={styles.form}
        data={equipment || undefined}
        onSubmit={equipment == null ? createEquipment : updateEquipment}
        onDelete={
          equipment != null ? () => confirmDeleteHandler(true) : undefined
        }
        loading={loading}
        errorMessage={error || undefined}
      />
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 16,
  },
});
