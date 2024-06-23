export default function Home() {
    return (
        <>
            <h1 className="text-4xl text-center text-gray-700 max-w-xl mx-auto my-12 font-medium">
                Naucz się{" "}
                <strong className="font-medium text-emerald-600">
                    jezyka angielskiego
                </strong>{" "}
                latwo i przyjemnie!
            </h1>
            <div className="flex flex-col lg:flex-row items-start max-w-screen-xl mx-auto py-12 space-y-5 lg:space-y-0 lg:space-x-5">
                <section className="text-center">
                    <div className="bg-white border w-full p-12 rounded-xl shadow-lg">
                        <h2 className="font-medium text-lg mb-12">
                            Wybierz swoj poziom angielskiego:
                        </h2>
                        <div className="flex items-center justify-center flex-wrap gap-4">
                            <div className="bg-yellow-50 border shadow-lg p-12 w-6 flex items-center justify-center rounded-lg">
                                <p>A1</p>
                            </div>
                            <div className="bg-yellow-50 border shadow-lg p-12 w-6 flex items-center justify-center rounded-lg">
                                <p>A2</p>
                            </div>
                            <div className="bg-pink-50 border shadow-lg p-12 w-6 flex items-center justify-center rounded-lg">
                                <p>B1</p>
                            </div>
                            <div className="bg-pink-50 border shadow-lg p-12 w-6 flex items-center justify-center rounded-lg">
                                <p>B2</p>
                            </div>
                            <div className="bg-red-50 border shadow-lg p-12 w-6 flex items-center justify-center rounded-lg">
                                <p>C1</p>
                            </div>
                            <div className="bg-red-50 border shadow-lg p-12 w-6 flex items-center justify-center rounded-lg">
                                <p>C2</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="p-12 bg-white border rounded-xl shadow-lg">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Itaque laborum ut magnam voluptas nisi sed consequuntur
                        ea necessitatibus culpa nulla dolores et quia, ullam
                        sint tempora facilis, veritatis enim facere? Quo beatae
                        corporis consequatur perferendis cum est quasi tempora
                        aliquid quis odio possimus sint odit assumenda inventore
                        porro accusamus, perspiciatis debitis autem sed quidem.
                        Iste!
                    </p>
                </section>
            </div>
        </>
    );
}
