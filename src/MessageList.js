import React, {Component, Fragment} from 'react';
import {Badge, Card} from 'react-bootstrap';

class MessageList extends Component {
    render() {
        return (
           <Fragment>
                {this.props.messages.map(message => {
                return (
                    <Fragment>
                        <Badge variant="primary">
                            {message.senderId}
                        </Badge>
                        <Card style={{ width: '100%' }}
                            key={message.id}>
                            <Card.Body>{message.text}</Card.Body>
                        </Card>
                    </Fragment>
                )})}
            </Fragment>
        )
    }
}

export default MessageList
