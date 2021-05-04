import React from 'react';
import {View, Text, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { IStore } from '../../interface/interfaceStore';


export default () => {
  const dispatch = useDispatch();
  const {data} = useSelector((state: IStore) => state.root);
  const test = useSelector((state) => state);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        title="add"
        onPress={() =>
          dispatch((dispatch: (arg0: { type: string; key: string; value: number; }) => any) =>
            dispatch({
              type: 'add',
              key: 'data',
              value: Math.floor(Math.random() * 10),
            }),
          )
        }
      />
      {data.map((d: { active: any; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, i: any) => (
        <>
          {d.active && (
            <View key={`${d.title + i}`} style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 20}}>{d.title}</Text>
              <Button
                title="remove"
                onPress={() =>
                  dispatch((dispatch: (arg0: { type: string; key: string; value: any; }) => any) =>
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
