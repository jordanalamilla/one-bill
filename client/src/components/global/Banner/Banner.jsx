import './Banner.scss'

const Banner = (props) => {
    const titleElement = props.title && <h1 className="banner-title">{props.title}</h1>;
    const descriptionElement = props.description && <h5 className="banner-description">{props.description}</h5>;

    return (
        <section className="banner-section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {titleElement}
                        {descriptionElement}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner