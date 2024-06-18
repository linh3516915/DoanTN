import styles from './BannerOfPage.module.css'

function BannerOfPage({ bigTitle, subtitle, orderTitle }) {
    return (
        <>
        <div class="product-big-title-area">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="product-bit-title text-center">
                        <h2>{bigTitle}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </>
    );
}

export default BannerOfPage;