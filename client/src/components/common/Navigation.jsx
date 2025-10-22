import React from 'react'
import { Link } from "react-router"

const Navigation = () => {
    return (
        <section className="navigation">
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
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