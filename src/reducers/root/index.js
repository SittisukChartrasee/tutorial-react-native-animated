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

export default (state = initState, action) => {
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
