import * as React from "react";
import {Icon} from "../util/icon";
import Link from "next/link";

export default function ServiceGridItem({title, icon, short_description, link}) {
    return (
        <div className="col-md-6">
            <Link
                key={link}
                href={`/services/` + link}
                passHref
            >
            <div className="service">
                <Icon
                    data={{
                        name: icon.name,
                        size: 'custom',
                    }}
                    className="w-7 h-auto"
                />
                <h3>{title}</h3>
                <p>{short_description}</p>
            </div>
            </Link>
        </div>
    )
}
