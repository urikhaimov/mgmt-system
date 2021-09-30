import React, { useContext } from 'react'
import Select from 'react-select';
import { UserContext } from '../UserContext';
import { getOptions, customStyles } from '../util';


const SearchPanel = () => {
    const context = useContext(UserContext);
    const options = getOptions(context.statusList)
    const firstOption = {
        value: '',
        label: 'All statuses'
    };
    options.unshift(firstOption)
    const text = context.text;
    const status = context.status;
    const selectedOption = {
        value: status === 'All statuses' ? '' : status,
        label: status
    }

    const handleChangeText = (e) => {
        let value = e.target.value;
        context.filterUsers(value, selectedOption);
        context.onChangeForm(e)

    }

    const onSelectHandler = (e) => {
        context.filterUsers(text, e)
    }

    return (
        <div className="search-panel">
            <button onClick={context.userCreateOpen}>{context.buttonText}</button>
            <input type="text" onChange={handleChangeText} value={text} />
            <div className="separator"></div>
            <Select
                value={selectedOption}
                onChange={onSelectHandler}
                options={options}
                menuPortalTarget={document.body}
                menuPosition={'fixed'}
                className="react-select-container"
                classNamePrefix="react-select"
                styles={customStyles}
            />
        </div>
    )
}

export default SearchPanel;