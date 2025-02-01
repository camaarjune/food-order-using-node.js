import { assets } from '../../assets/assets'
import './Footer.css'
//<img src={assets.logo} alt="" />
export default function Footer() {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">

            <div className="footer-content-left">
               
                <p>this is best Cafe Delivery</p>
                
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>                   
            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div className="footer-conent-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+25261000000</li>
                    <li>conact@Cafe.com</li>
                </ul>
            </div>

        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 &copy;
         Cafe.com - All Right Reserved. </p>
    </div>
  )
}
