import React from 'react'
import { render } from 'react-dom';
import './prism.css';
import './index.css';

const ext = {
    css: 'css',
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
}

const base = "https://raw.githubusercontent.com/";

function getExt(s) {
    return s.substr(s.lastIndexOf('.') + 1);
}

function getLang(s) {
    return ext[getExt(s)] || getExt(s);
}

class App extends React.Component {

    state = {
        code: '',
        ext: ''
    }

    componentDidMount() {
        const search = new URLSearchParams(window.location.search);
        const s = base + search.get('file');
        fetch(s)
            .then(r => r.text())
            .then(code => {
                this.setState({ code, ext: getLang(s) });
                window.Prism.highlightAll();
            })
    }

    render() {
        return (
            <div>
                <pre className={"language-" + this.state.ext}><code className={"language-" + this.state.ext}>{this.state.code}</code></pre>
            </div>
        );
    }
}


render(<App />, document.getElementById('root'));
