import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav>
            <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', gap: '20px' }}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
            <hr />
        </nav>
    )
}

export default Navbar
