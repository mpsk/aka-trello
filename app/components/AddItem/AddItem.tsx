'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TextField } from 'react-md';

import { DashboardStore } from '../../stores';
import Icon from '../Icon/Icon';

import './AddItem.scss';

interface AddItemProps {
    onSubmit(value: string): void;
    placeholder?: string;
}

export default class AddItem extends React.PureComponent<AddItemProps, {value: string}> {

    static defaultProps = {
        placeholder: ''
    }

    constructor() {
        super();
        this.state = {
            value: ''
        }
    }
    
    onSubmit(e) {
        // const { dashboardStore } = this.props;
        if (e.key === 'Enter' && this.state.value) {
            this.props.onSubmit(this.state.value);
            // dashboardStore.addColumn(this.state.value);
            this.setState({value: ''});
        }
    }

    render() {
        const textProps = {
            className: 'add-column',
            placeholder: this.props.placeholder,
            rightIcon: <Icon name='subdirectory_arrow_left' />,
            value: this.state.value,
            onChange: (value) => this.setState({value}),
            onKeyPress: (e) => this.onSubmit(e)
        };

        return (
            <div className="AddItem">
                <TextField id='new-column-title' {...textProps} />
            </div>  
        )
    }

}
