import './Banner.scss'

const Banner = (props) => {
    const titleElement = props.title && <h1>{props.title}</h1>;
    const descriptionElement = props.description && <h5>{props.description}</h5>;

    return (
        <section className="banner-section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className='banner-title'>
                            {titleElement}
                        </h1>
                        <h4 className="banner-description">
                            {descriptionElement}
                        </h4>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner