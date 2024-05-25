import { useEffect, useState } from "react";
import styles from './ProductDetail.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Banner from "../Banner/Banner";
export default function ProductDetail() {
    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="row gx-5">
                        <aside className="col-lg-6">
                            <div className="border rounded-4 mb-3 d-flex justify-content-center">
                                <a data-fslightbox="mygalley" className="rounded-4" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp">
                                    <img style={{ maxWidth: '100%', maxHeight: '100vh', margin: 'auto' }} className="rounded-4 fit" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp" />
                                </a>
                            </div>
                            <div className="d-flex justify-content-center mb-3">
                                <a data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big1.webp" >
                                    <img width="60" height="60" className="rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big1.webp" />
                                </a>
                                <a data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big2.webp" >
                                    <img width="60" height="60" className="rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big2.webp" />
                                </a>
                                <a data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big3.webp" >
                                    <img width="60" height="60" className="rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big3.webp" />
                                </a>
                                <a data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big4.webp" >
                                    <img width="60" height="60" className="rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big4.webp" />
                                </a>
                                <a data-fslightbox="mygalley" className="border mx-1 rounded-2" target="_blank" data-type="image" href="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp" >
                                    <img width="60" height="60" className="rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp" />
                                </a>
                            </div>

                        </aside>
                        <main className="col-lg-6">
                            <div className="ps-lg-3">
                                <h4 className="title text-dark">
                                    tên sản Phẩm
                                </h4>


                                <div className="mb-3">
                                    <span className="h5">$<h4>giá tiền</h4></span>

                                </div>

                                <p>nội dung của sản phẩm</p>

                                <div className="row">
                                    <dt className="col-3">Color: </dt>
                                    <dd className="col-9"><h4>màu sắc</h4></dd>

                                    <dt className="col-3">Capacity: </dt>
                                    <dd className="col-9"><h4>dung lượng</h4></dd>
                                </div>

                                <hr />

                                <div className="row mb-4">


                                    <div className="col-md-4 col-6 mb-3">
                                        <label className="mb-2 d-block">Quantity:</label>
                                        <div className="input-group mb-3" style={{ width: '170px' }}>
                                            <input type="text" className="form-control text-center border border-secondary" placeholder="14" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-warning shadow-0">BUY </button>
                                <button className="btn btn-primary shadow-0"> <i className="me-1 fa fa-shopping-basket"></i>  ADD CART</button>
                                <button className="btn btn-white text-dark"> <i className="me-1 fa fa-shopping-basket"></i>  LIKE </button>
                            </div>
                        </main>
                    </div>
                </div>
            </section>


            <section className="bg-light border-top py-4">
                <div className="container">

                    <div className="row gx-4" >
                        <div className="col-lg-8 mb-4">
                            <div className="border rounded-2 px-3 py-2 bg-white" style={{ fontFamily: 'webkit-body', borderRadius: '26px', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}>
                                <Banner />
                                <div className="tab-content" id="ex1-content">
                                    <div className="tab-pane fade show active" id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                                        <p>
                                            Nội dung của sản phẩm

                                        </p>
                                        <div className="row mb-2">
                                            <div className="col-12 col-md-6">
                                                <ul className="list-unstyled mb-0">
                                                    <li><i className="fas fa-check text-success me-2"></i>Some great feature name here</li>
                                                    <li><i className="fas fa-check text-success me-2"></i>Lorem ipsum dolor sit amet, consectetur</li>
                                                    <li><i className="fas fa-check text-success me-2"></i>Duis aute irure dolor in reprehenderit</li>
                                                    <li><i className="fas fa-check text-success me-2"></i>Optical heart sensor</li>
                                                </ul>
                                            </div>
                                            <div className="col-12 col-md-6 mb-0">
                                                <ul className="list-unstyled">
                                                    <li><i className="fas fa-check text-success me-2"></i>Easy fast and ver good</li>
                                                    <li><i className="fas fa-check text-success me-2"></i>Some great feature name here</li>
                                                    <li><i className="fas fa-check text-success me-2"></i>Modern style and design</li>
                                                </ul>
                                            </div>
                                        </div>



                                        <table className="table border mt-3 mb-2">
                                            <tbody>
                                                <h3>thông số kỹ thuật</h3>
                                                {/* {showDetails && (
                          <><tr>
                      <th className="py-2">Screen size:</th>
                      <td className="py-2">{ctchID.size_man_hinh}</td>
                    </tr>
                    <tr>
                      <th className="py-2">CPU:</th>
                      <td className="py-2">{ctchID.cpu}</td>
                    </tr>
                    <tr>
                      <th className="py-2">RAM:</th>
                      <td className="py-2">{ctchID.ram}</td>
                    </tr>
                            <tr>
                      <th className="py-2">Camera</th>
                      <td className="py-2">{ctchID.camera}</td>
                    </tr>
                    <tr>
                      <th className="py-2">Pin</th>
                      <td className="py-2">{ctchID.pin}</td>
                    </tr>
                    <tr>
                      <th className="py-2">Sim</th>
                      <td className="py-2">{ctchID.sim}</td>
                    </tr>
                    <tr>
                      <th className="py-2">Color</th>
                      <td className="py-2">{ctchID.he_dieu_hanh}</td>
                    </tr>
                    <tr>
                      <th className="py-2">GPU</th>
                      <td className="py-2">{ctchID.gpu}</td>
                    </tr>
                    <tr>
                      <th className="py-2">GPS</th>
                      <td className="py-2">{ctchID.gps}</td>
                    </tr>
                    <tr>
                      <th className="py-2">Tốc độ sử lí CPU:</th>
                      <td className="py-2">{ctchID.toc_do_cpu}</td>
                    </tr> 
                          </>
                        )}
                        */}
                                            </tbody>
                                        </table>
                                        <button>
                                            xem chi tiết
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}