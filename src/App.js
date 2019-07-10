import React, { Fragment, Component } from 'react';
import './bootstrap.css';
import { Navbar, Container } from 'react-bootstrap';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import CREDENTIAL from './Credential';

class App extends Component {
    constructor() {
        super();
        this.state = {
            messages: []
        }
        this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount() {
        const chatManager = new ChatManager({
            instanceLocator: CREDENTIAL.instanceLocator,
            userId: CREDENTIAL.userId,
            tokenProvider: new TokenProvider({
                url: CREDENTIAL.testToken
            })
        })

        chatManager.connect()
        .then(currentUser => {
            this.currentUser = currentUser;
            this.currentUser.subscribeToRoom({
                roomId: CREDENTIAL.roomId,
                hooks: {
                    onMessage: message => {
                        this.setState({
                            messages: [...this.state.messages, message]
                        })
                    }
                }
            })
        })
    }

    sendMessage(text) {
        this.currentUser.sendMessage({
            text,
            roomId: CREDENTIAL.roomId
        })
    }

    render() {
        return (
            <Fragment>
                <Navbar className="navbar-expand-lg navbar-light bg-light">
                    <Container>
                        <Navbar.Brand>Simple React Chat</Navbar.Brand>
                    </Container>
                </Navbar>
                <Container style={{ height: '80vh', width: '25%', 'overflow-y': 'scroll' }}>
                    <MessageList 
                        messages={this.state.messages} />
                </Container>
                <Container style={{ width: '25%' }}>
                    <SendMessageForm
                        sendMessage={this.sendMessage} />
                </Container>
            </Fragment>
        );
    }
}

export default App;
