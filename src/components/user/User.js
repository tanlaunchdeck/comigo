import React, { Component } from 'react'
import { Card, Button, Tooltip } from 'antd'
import Image from '../common/Image'
import { Link } from 'routes'
const profileIcon = '/static/images/icon-profile.svg'
const mailIcon = '/static/images/icon-mail.svg'
export default class extends Component {
    renderBadge() {
        const { userBadge, giveUserNod } = this.props

        return userBadge.map((item, index) => {
            return <Card key={index} onClick={() => giveUserNod(item._id)} hoverable className="badge__item ">
                <img src={item.imageURL} alt="url" className={item.isChoose ? "hover" : "unhover"} />
                {
                    item.count === 0 ?
                        <div className="badge__item__count">...</div> : <div className="badge__item__count">{item.count}</div>

                }

                {/* <div className="Process-On paddingTop2"> {item.name}</div> */}
            </Card>

        })
    }
    render() {
        const {
            peopleDetail,
            userBadge
        } = this.props

        return (
            <div className="user-detail">
                <Card className="user-detail__left" bordered={false}>
                    <div className="user-header">
                        <div className="header-left">
                            <img src={peopleDetail.pictureURL ? peopleDetail.pictureURL : profileIcon} alt="user" />
                            <div className="header-info">
                                <div className="user-name">{peopleDetail.firstName + ` ` + peopleDetail.lastName}</div>
                                <div className="Input-Search-Empty">{
                                    peopleDetail.graduationYear > 2019 ? "Graduating in " : "Graduated in "} {peopleDetail.graduationYear}
                                    {` | ${peopleDetail.email}`}</div>
                            </div>
                        </div>



                        <div className="header-right">
                            <Tooltip title="Send Email">

                            </Tooltip>
                        </div>
                    </div>
                    <div className="user-majors">
                        {peopleDetail.majors && peopleDetail.majors.map((item, index) => {
                            return <Button key={index} className="major-button">{item}</Button>
                        })}
                    </div>
                    <div className="user-body">
                        <section className="paddingBottom40">
                            <div className="paddingBottom16 title-section ">
                                PROJECTS
                        </div>
                            {
                                peopleDetail.projects &&
                                <div className="project">
                                    {
                                        peopleDetail.projects.map((item, index) => {
                                            return <Link key={item._id} prefetch to={"/" + item._id} >
                                                <a>
                                                    <div className="project__item">
                                                        <img alt="cover" src={item.coverURL} />
                                                        <div className="project__name">{item.name}</div>
                                                        <div className="project-collaborators">
                                                            <img alt="avatar" src={peopleDetail.pictureURL ? peopleDetail.pictureURL : profileIcon} />
                                                            {
                                                                item.shares && item.shares.map(coll => {
                                                                    return <img alt="avatar" src={coll.pictureURL ? coll.pictureURL : profileIcon} />
                                                                })
                                                            }</div>
                                                    </div>
                                                </a>
                                            </Link>

                                        })
                                    }
                                </div>
                            }

                        </section>

                        <section className="paddingBottom40">
                            <div className="paddingBottom16 title-section ">
                                ABOUT
                        </div>
                            <div className="project-name">
                                {peopleDetail.bio}
                            </div>
                        </section>

                        <section className="paddingBottom40">
                            <div className="paddingBottom16 title-section ">
                                SKILLS
                        </div>
                            {
                                !peopleDetail.skills ? <Link prefetch to="/user/edit">
                                    <a>
                                        <Button
                                            icon="plus"
                                            className="skill-button">
                                            Add Skill
                                            </Button>
                                    </a>
                                </Link>
                                    :
                                    peopleDetail.skills.map((item, index) => {
                                        return <Button key={index} className="skill-button">{item}</Button>
                                    })
                            }
                        </section>
                        <section className="paddingBottom40">
                            <div className="paddingBottom16 title-section ">
                                INTERESTS
                        </div>
                            {peopleDetail.interests && peopleDetail.interests.map((item, index) => {
                                return <Button key={index} className="skill-button">{item}</Button>
                            })}
                        </section>

                        <section className="paddingBottom40">
                            <div className="paddingBottom16 title-section ">
                                LINKS
                        </div>
                            {
                                peopleDetail.links &&
                                peopleDetail.links.map((item, index) => {
                                    return <a href={item.includes("http") ?
                                        item : "http://" + item} key={index} target="_blank">
                                        <Button key={index} className="link-button">{item}</Button>
                                    </a>
                                })
                            }
                        </section>
                    </div>
                </Card>

                <section className="user-detail__right">
                    <Button onClick={() => {
                        window.location = `mailto:${peopleDetail.email}`;
                    }} type="primary" icon="mail" className="contact-button">Contact {`${peopleDetail.firstName}`}</Button>
                    <Card bordered={false}>
                        <div className="paddingBottom16 title-section ">
                            BADGES
                        </div>
                        <div className="Input-Search-Empty"> Give them nods by clicking on these badges below.</div>
                        {
                            userBadge && <div gutter={16} className="badge">
                                {this.renderBadge()}
                            </div>
                        }

                    </Card>
                </section>


            </div>
        )
    }
}


