export const getOptions = (data) => data.map(e => ({
    value: e,
    label: e
}));


export const customStyles = {
    menuPortal: provided => ({ ...provided, zIndex: 9999, fontSize: '12px' }),
    menu: provided => ({ ...provided, zIndex: 9999, fontSize: '12px' })
}

export const customSmallStyles = {
    menuPortal: provided => ({ ...provided, zIndex: 9999, fontSize: '10px' }),
    menu: provided => ({ ...provided, zIndex: 9999, fontSize: '10px' })
  };