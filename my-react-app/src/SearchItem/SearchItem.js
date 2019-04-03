import React, { Component } from 'react';
import './SearchItem.css';
import { InputGroup, InputGroupAddon, Button, Input, ListGroup, ListGroupItem } from 'reactstrap';

class SearchItem extends Component {

  render() {
    let itemId = 0;
    const listItems = this.props.value.map((item) => {
      return (
        <ListGroupItem
          key={item.place_id}
          tag="button"
          action
          onClick={this.props.onSearchListClick}
          data-id={itemId++}
        >{item.display_name}
        </ListGroupItem>
      );
    });
    return (
      <div>
        <InputGroup>
          <Input onChange={this.props.onChange} />
          <InputGroupAddon addonType="append">
            <Button color="success" onClick={() => this.props.onClick()}>Search</Button>
          </InputGroupAddon>
        </InputGroup>
        <ListGroup>{listItems}</ListGroup>
      </div>
    );
  }
}

export default SearchItem;