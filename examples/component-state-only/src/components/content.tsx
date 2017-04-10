import * as React from "react"
import { ResponsiveChildProps, Breakpoint } from "react-responsive-components"
import * as classNames from "classnames"

interface ContentProps extends ResponsiveChildProps {}

export class Content extends React.Component<ContentProps, void> {
	render() {
        return (
            <div className="content">
                <ContentItem title="Lorem ipsum" content="Lorem ipsum dolor sit amet" responsiveKey={this.props.responsiveKey} />
                <ContentItem title="Sententiae" content="Sententiae voluptatum per an" responsiveKey={this.props.responsiveKey} />
                <ContentItem title="No sea" content="No sea percipit mnesarchum" responsiveKey={this.props.responsiveKey}/>
                <ContentItem title="Ne vel" content="Ne vel periculis explicari" responsiveKey={this.props.responsiveKey}/>
                <ContentItem title="Assum mediocrem" content="Assum mediocrem posidonium ea ius" responsiveKey={this.props.responsiveKey}/>
            </div>
		)
	}
}

interface ContentItemProps extends ResponsiveChildProps {
    title: string,
    content: string
}
function ContentItem(props: ContentItemProps) {
    const key = props.responsiveKey
    return (
        <div className={classNames("content-item", { [`content-item-${key}`]: !!key })}>
            <h3 className={classNames("content-item-heading", { [`content-item-heading-${key}`]: !!key })}>{props.title}</h3>
            <div className={classNames("content-item-text", { [`content-item-text-${key}`]: !!key })}>{props.content}</div>
        </div>
    )
}
