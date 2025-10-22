import React from 'react'

const Banner = (props) => {
    const titleElement = props.title && <h1>{props.title}</h1>;
    const descriptionElement = props.description && <h5>{props.description}</h5>;

    return (
        <div class="container">
            <div class="row">
                <div class="col-12">
                    {titleElement}
                    {descriptionElement}
                </div>
            </div>
        </div>
    )
}

export default Banner