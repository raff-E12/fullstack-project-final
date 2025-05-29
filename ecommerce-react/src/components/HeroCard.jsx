import "../style/HeroCard.css";
import { Link } from "react-router-dom";

function HeroCard() {
  return (
    <section>
      <div className="container mt-5">
        <div className="row">
          <div className=" col-12 col-md-6">
            <h4 className="display-4 fw-bold text-center my-5">
              LEATHER CAPSULE
            </h4>
          </div>
          <div className="col-12 col-md-6">
            <p className="lead text-center my-5 text-justify">
              Let yourself be captivated by our leather collection — a perfect
              balance between artisanal tradition and contemporary design.
            </p>
          </div>
        </div>

        <div className="row g-4 py-4">
          <div className="col-12 col-md-6">
            <div className="placeholder-img shadow rounded position-relative img-bg-1th">
              <Link
                to="/categories/streetwear"
                className="btn btn-dark position-absolute bottom-0 start-0 m-3"
              >
                Dresses{" "}
              </Link>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="row">
              <div className="col-12 mb-3">
                <div className="placeholder-img rounded position-relative img-bg-2th">
                  <Link
                    to="/categories/felpe"
                    className="btn btn-dark position-absolute bottom-0 start-0 m-3"
                  >
                    Hoodies{" "}
                  </Link>
                </div>
              </div>
              <div className="col-12 pb-5">
                <div className="placeholder-img rounded position-relative img-bg-3th">
                  <Link
                    to="/categories/scarpe"
                    className="btn btn-dark position-absolute bottom-0 start-0 m-3"
                  >
                    Sneakers{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroCard;
