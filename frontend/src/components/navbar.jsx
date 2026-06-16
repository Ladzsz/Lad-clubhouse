import '../assets/styles/navbar.css'

function Navbar() {

  return (
    <>
    <nav className="navbar">
        <div className="navImg"><img src="/images/angrylogo.webp" className='navimg1' alt="logo image"/></div>
        <ul>
            <li className='btn navbtn navtext'>Home</li>
            <li className='btn navbtn navtext'>Posts</li>
        </ul>
        <div className="navImg"><img src="/images/angrylogo2.webp" className='navimg2' alt="logo image"/></div>
    </nav>

    </>
  )
}

export default Navbar
