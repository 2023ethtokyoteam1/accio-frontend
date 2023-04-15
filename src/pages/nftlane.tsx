export default function nftlane() {
    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center text-2xl ">
                <div className="w-2/5  h-screen flex items-center relative shadow-2xl">
                    <div className="absolute top-0 left-0 bg-slate-700 w-full h-16 flex items-center pl-4">
                        Header / LOGO
                    </div>
                    <div className="p-7">
                        Airstack is developing the most comprehensive set of opinionated web3 APIs. Opinionated APIs
                        address specific use cases and enable developers to plug-and-play the APIs with minimal setup,
                        configuration, or custom infrastructure required. Our goal is to build APIs that meet the
                        specific needs and use cases of our users. Please fill out the following form so we can learn
                        about your needs and use cases.
                        <div className="mt-5 ">
                          <span>mainNet</span>
                            <input className="border border-white rounded p-2 ml-4" />
                        </div>
                    </div>
                    <div className="absolute bottom-0 bg-slate-400 opacity-70 w-full h-12 flex justify-center items-center">
                        {" "}
                        here we go!
                    </div>
                </div>
            </div>
        </>
    );
}
