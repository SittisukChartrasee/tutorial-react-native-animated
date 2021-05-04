export type IRoot = {
  data: dataItems[]
}

type dataItems = {
  title: string
  active: boolean
}

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

export default (state = initState, action: { type: string; value: number; key: string; }) => {
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
