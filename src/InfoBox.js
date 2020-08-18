import React from 'react'
import { Card, CardContent, Typograph, Typography } from '@material-ui/core'

function infoBox({title, cases, total}) {
    return (
        <Card>
            <CardContent>
                {/* Title */}
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                {/* Number of cases */}
                <h2 className="infoBox__cases">{cases}</h2>

                {/* Total */}
                <Typography className="infoBox__total" color="textSecondary">
                    Total {total} 
                </Typography>
            </CardContent>
        </Card>
    )
}

export default infoBox
