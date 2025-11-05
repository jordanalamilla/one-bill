import './Navigation.scss'
import { Link } from "react-router"

const Navigation = () => {
    return (
        <section className="navigation-section">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">OneBill</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                            <Link to="/bills" className="nav-link">Bills</Link>
                            <Link to="/create" className="nav-link">+ New Bill</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </section>
    )
}

export default Navigation