import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect'
import { selectCollectionForPreview } from "../../redux/shop/shop.selector";
import CollectionPreview from "../collection-preview/collection-preview.component";

// import  "./collection-preview.styles.selectDirectorySections";

const CollectionOverview = ({ collections}) => (
    <div className='collections-overview'>
         {
            collections.map(({id, ...otherCollectionProps})=> (
                <CollectionPreview key={id} {...otherCollectionProps}></CollectionPreview>
                ))
            }
                
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
})

export default connect(mapStateToProps)(CollectionOverview);