import PropTypes from 'prop-types';

const Cart = ({ selectedCourse, totalCredit, totalPrice, remainingCredit }) => {
    // console.log(selectedCourse)
    return (
        <div>
            <h2 className="text-lg font-bold text-[#2F80ED]">Credit Hour Remaining {remainingCredit} hr</h2>
            <hr className="my-4" />
            <h2 className="text-xl font-bold mb-5">Course Name</h2>
            {
                selectedCourse.map((card) => (
                    <li key={card.id}>{card.title}</li>
                ))
            }
            < hr className="mb-4 mt-6" />
            <h4 className="font-semibold text-[#1C1B1BCC]">Total Credit Hour : {totalCredit}</h4>
            <hr className="my-4" />
            <h4 className="font-semibold text-[#1C1B1BCC]">Total Price : {totalPrice} USD</h4>
        </div>
    );
}

Cart.propTypes = {
    selectedCourse: PropTypes.object,
    totalCredit:PropTypes.number,
    totalPrice:PropTypes.number,
    remainingCredit:PropTypes.number
}

export default Cart;
