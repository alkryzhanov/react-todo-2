import React, { Component } from 'react';
import './SearchPanel.css';

class SearchPanel extends Component {
    state = {
        term: ''
    };
    onSearchChange = (evt) => {
        const term = evt.target.value;
        this.setState({ term });
        this.props.onSearchChange(term);
    };
    render() {
        return (
            <input
                type='text'
                placeholder='type to search'
                className='form-control search-input'
                value={this.state.term}
                onChange={this.onSearchChange} />
        );
    }
};

export default SearchPanel;
