import React from 'react'

const Footer = () => {
    return (
        <>
            <footer class="content-footer footer bg-footer-theme">
                <div class="container-xxl d-flex flex-wrap justify-content-center py-2 flex-md-row flex-column">
                    <div class="mb-2 mb-md-0 justify-content-center" >
                        {/* ©
                        <script>
                            document.write(new Date().getFullYear());
                        </script> */}
                         made with ❤️ by {" "}
                        <a href="https://koliinfotech.com" target="_blank" class="footer-link fw-bolder">koli Infotech</a>
                    </div>
                    {/* <div>
                        <a href="https://themeselection.com/license/" class="footer-link me-4" target="_blank">License</a>
                        <a href="https://themeselection.com/" target="_blank" class="footer-link me-4">More Themes</a>

                        <a href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                            target="_blank" class="footer-link me-4">Documentation</a>

                        <a href="https://github.com/themeselection/sneat-html-admin-template-free/issues" target="_blank"
                            class="footer-link me-4">Support</a>
                    </div> */}
                </div>
            </footer>
        </>
    )
}

export default Footer