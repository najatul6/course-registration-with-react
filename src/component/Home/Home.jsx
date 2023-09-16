import { useEffect, useState } from 'react';
import { FaDollarSign, FaBookOpen } from 'react-icons/fa';
import Cart from '../Cart/Cart';

const Home = () => {
    const [allCard, setAllCard] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState([]);
    const [remainingCredit, setRemainingCredit] = useState(20);
    const [totalCredit, setTotalCredit] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetch("./course_data.json")
            .then(res => res.json())
            .then(data => setAllCard(data));
    }, []);

    const handleAddCourse = (card) => {
        const isExit = selectedCourse.find((items) => items.id === card.id);
        let credit = card.time;
        let price = card.price;

        if (isExit) {
            return alert("Opps!! You Already Select This Course")
        }
        else {
            // Credit sum 
            selectedCourse.forEach((item) => {
                credit = credit + item.time;
                price = price + item.price;

            });
            const remainingCredit= 20 - credit;
            if (credit>20) {
                return alert('Sorry! You have no more Credit!!')
            }
            setTotalCredit(credit);
            setRemainingCredit(remainingCredit);
            setTotalPrice(price);
            setSelectedCourse([...selectedCourse, card]);
        }
    }


    return (
        <div className="mx-auto">
            <div className="md:flex space-y-4 md:space-y-0 px-2">
                <div className="md:w-2/3 grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {
                        allCard.map((card) => (
                            <div key={card.id} className="md:mr-2 rounded-lg bg-white shadow-xl">
                                <div className="p-6">
                                    <img className='rounded-lg w-full h-[144px] mx-auto' src={card.cover} alt="" />

                                    <h2 className='mt-4 mb-3 text-lg font-semibold'>{card.title}</h2>
                                    <p className='text-[#1C1B1B99] '>{card.description}</p>
                                    <div className='flex flex-row md:flex-col lg:flex-row md:items-center justify-between mb-6 mt-5'>
                                        <div className='flex gap-1 items-center'>
                                            <FaDollarSign></FaDollarSign>
                                            <p className='font-medium text-[#1C1B1B99]'>Price:{card.price}</p>
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            <FaBookOpen></FaBookOpen>
                                            <p className='font-medium text-[#1C1B1B99]'>Credit: {card.time}hr</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleAddCourse(card)} className='text-lg font-semibold text-white py-2 w-full bg-[#2F80ED] rounded-lg'>Select</button>
                                </div>
                            </div>))
                    }
                </div>
                <div className="md:w-1/3 bg-white rounded-lg p-6 shadow-xl">
                    <div className="text-[#1C1B1B99] list-decimal">
                        <Cart selectedCourse={selectedCourse} totalCredit={totalCredit} totalPrice={totalPrice} remainingCredit={remainingCredit}></Cart>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Home;