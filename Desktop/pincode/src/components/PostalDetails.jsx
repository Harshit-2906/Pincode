import React from 'react';

const PostalDetails = ({ data, filter, setFilter }) => {
    const filteredData = data.filter((postOffice) =>
        postOffice.Name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="postal-details">
            <input
                type="text"
                value={filter}
                placeholder="Filter by post office name"
                onChange={(e) => setFilter(e.target.value)}
            />

            <div className="results">
                {filteredData.length > 0 ? (
                    filteredData.map((postOffice, index) => (
                        <div key={index} className="post-office">
                            <h3>{postOffice.Name}</h3>
                            <p>Pincode: {postOffice.Pincode}</p>
                            <p>District: {postOffice.District}</p>
                            <p>State: {postOffice.State}</p>
                        </div>
                    ))
                ) : (
                    <p>Couldn't find the postal data you're looking for…</p>
                )}
            </div>
        </div>
    );
};

export default PostalDetails;
