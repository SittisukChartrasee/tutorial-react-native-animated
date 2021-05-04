import React from 'react';
import {View, Text, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { IStore } from '../../interface/interfaceStore';
import { IRootAction, IRootDefault } from '../../reducers/root';


export default () => {
  const dispatch = useDispatch();
  const {data} = useSelector((state: IStore) => state.root);
  const test = useSelector((state) => state);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        title="add"
        onPress={() =>
          dispatch((dispatch: (arg0: IRootAction) => void) =>
            dispatch({
              type: 'add',
              key: 'data',
              value: Math.floor(Math.random() * 10),
            }),
          )
        }
      />
      {data.map((d: IRootDefault, i: number) => (
        <>
          {d.active && (
            <View key={`${d.title + i}`} style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 20}}>{d.title}</Text>
              <Button
                title="remove"
                onPress={() =>
                  dispatch((dispatch: (arg0: IRootAction) => void) =>
                    dispatch({type: 'remove', key: 'data', value: i}),
                  )
                }
              />
            </View>
          )}
        </>
      ))}
    </View>
  );
};
