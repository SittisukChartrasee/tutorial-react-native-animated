export type IRoot = {
  data: IRootDefault[];
};

export type IRootDefault = {
  title: string;
  active: boolean;
};

export type IRootAction = {
  type: string;
  value: number;
  key: string;
};

const initState = {
  data: [
    {
      title: 'super',
      active: true,
    },
    {
      title: 'ring',
      active: true,
    },
    {
      title: 'over',
      active: true,
    },
  ],
};

export default (state: IRoot = initState, action: IRootAction) => {
  switch (action.type) {
    case 'add':
      state.data.push({
        title: `super${action.value}`,
        active: true,
      });
      return {...state};

    case 'remove':
      const dataSets = state.data.map((d, i) =>
        i === action.value ? {...d, active: false} : d,
      );
      return {...state, [action.key]: dataSets};

    default:
      return state;
  }
};
