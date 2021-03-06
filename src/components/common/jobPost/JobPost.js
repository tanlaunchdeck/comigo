import React, { Component } from 'react'
import { Card, Row, Col, Tag, Button } from 'antd'
import Image from '../Image'
import moment from 'moment'
import { Router } from 'routes'
import _jobPost from './_jobPost.less'
import SkillTag from '../skillTag/SkillTag';


export default class extends Component {

    render() {
        const {  jobDetail, user, toggleJobDetail,
            postedUser } = this.props
      
        const email = postedUser.email
        const subject = `Interested in your job, ` + jobDetail.title
        const body = `Hi ${postedUser.firstName}, 

I found your project, ${jobDetail.projectData.name}, on Comigo! I'm really interested in the job you shared, ${jobDetail.title}. If you're still looking for support, it would be great to chat more and see how I can help. Are you available to talk more about this opportunity, maybe this week or next? 

I look forward to hearing from you! 

All the best, 
${user.firstName}`
        return (
            <Card hoverable bordered={false} className="job-post">

                <div className="job-header">
                    <Image image={postedUser.pictureURL} />
                    <div className="job__title">
                        <div className="Body-Dark-Grey-Left">
                            <a onClick={() => Router.pushRoute("/user/" + postedUser._id)} className="Button-Black-Left">
                                {postedUser.firstName + ` ` + postedUser.lastName + ` `}
                            </a>
                            {`created a ${moment.unix(jobDetail.updatedAt).isSame(moment(), 'hour') ? "new" : ""} job in `}

                            <a onClick={() => Router.pushRoute("/" + jobDetail.projectData._id)} className="Button-Black-Left">{jobDetail.projectData.name}</a>

                        </div>
                        <div className="Caption-Grey-Left">{moment.unix(jobDetail.updatedAt).fromNow()}</div>
                    </div>
                </div>

                <div className="job-body">
                    <div className="apply">
                        <a onClick={() => toggleJobDetail({ jobDetail: jobDetail, })} className="H2-Black-Left">{jobDetail.title}</a>
                        <a href={`mailto:${email}?subject=Interested in your job ${subject}&body=${body}`}> <Button type="primary" className="Button-White-Center">Apply</Button></a>
                    </div>
                    <SkillTag tags={jobDetail.tags} />


                    <div className="Body-Black-Left desc paddingTop16">{`${jobDetail.description}`}
                    </div>
                </div>
            </Card >
        )
    }
}


