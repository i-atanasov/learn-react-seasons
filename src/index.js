import React from 'react';
import ReactDOM from 'react-dom/client';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
    state = { lat: null, errMessage: '' };

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({ lat: position.coords.latitude }) ,
            (err) => this.setState({ errMessage: err.message })
        );
    }

    renderContent() {

        if (this.state.lat && !this.state.errMessage) {
            return <SeasonDisplay lat={this.state.lat} />;
        }

        if (this.state.errMessage && !this.state.lat) {
            return <div>Error: {this.state.errMessage}</div>;
        }

        return <Spinner message='Please allow location?' />;
       
    };

    render() {
        return (
            <div className='border green'>
                {this.renderContent()}
            </div>
        );
    }
}


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);