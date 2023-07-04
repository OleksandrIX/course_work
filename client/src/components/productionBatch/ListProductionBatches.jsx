import React, { useState } from "react";

import BatchAccordion from "./BatchAccordion";

const ListProductionBatches = ({ batches, deleteProductionBatch }) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => setExpanded(isExpanded ? panel : false);

    return (
        <>
            {batches.map((batch) => (
                <BatchAccordion
                    key={batch.serialNumberBatch}
                    batch={batch}
                    expanded={expanded}
                    changeExpanded={handleChange}
                    deleteProductionBatch={deleteProductionBatch}
                />
            ))}
        </>
    );
};

export default ListProductionBatches;