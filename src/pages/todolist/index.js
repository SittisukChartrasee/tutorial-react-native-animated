import React from 'react';
import {View, Text, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

export default () => {
  const dispatch = useDispatch();
  const {data} = useSelector((state) => state.root);
  const test = useSelector((state) => state);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        title="add"
        onPress={() =>
          dispatch((dispatch) =>
            dispatch({
              type: 'add',
              key: 'data',
              value: Math.floor(Math.random() * 10),
            }),
          )
        }
      />
      {data.map((d, i) => (
        <>
          {d.active && (
            <View key={`${d.title + i}`} style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 20}}>{d.title}</Text>
              <Button
                title="remove"
                onPress={() =>
                  dispatch((dispatch) =>
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
