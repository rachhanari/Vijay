import React, { Component } from 'react';
import styled from 'styled-components';
import TextContent from './TextContent';
import ImageContent from './ImageContent';

const Container = styled.div`
    display: flex;
    flex-flow: row nowrap;
    /* border: 1px dashed red; */
`;

class Work extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vh: 0,
      slideNumber: 0,
    };
    this.pageSplitTimes = 1.4;
    this.lastScrollTop = 0;
    this.scrollDirectionDown = true;
    this.handleScroll = this.handleScroll.bind(this);
    this.workDetails = [
      {
        number: '',
        projectName: '',
        projectDesc: '',
        projectType: '',
        roles: [''],
      },
      {
        number: '01',
        projectName: 'Photography',
        projectDesc: 'Portraits, Events, Products, Candid Moments',
        projectType: 'PICTURED',
        roles: ['Digital Content Creator'],
      },
      {
        number: '02',
        projectName: 'Video Editor',
        projectDesc: "I turn raw footage into engaging visual stories with clean cuts, smooth transitions, and creative flair — perfect for reels, promos, and cinematic edits.",
        projectType: 'VIDEO',
        roles: ['Video Editor & Visual Storyteller'],
      },
      {
        number: '03',
        projectName: 'Social Media',
        projectDesc: 'I create eye-catching posts, reels, and stories that boost engagement and build strong digital presence across Instagram, Facebook, and more.',
        projectType: 'SOCIAL MEDIA',
        roles: ['Social Media Content Creator'],
      },
      {
        number: '04',
        projectName: '3D Gift Designer',
        projectDesc: 'We create personalized 3D gifts for weddings and birthdays that turn memories into stunning keepsakes. From custom name frames to romantic photo illusions, each piece is crafted to surprise and delight.',
        projectType: '',
        roles: ['3D Gift Designer – Marriage & Birthday Specials '],
      },
      {
        number: '05',
        projectName: 'E-commerce Seller',
        projectDesc: 'I run a growing online store offering quality products with fast delivery and trusted service. From trending items to customized gifts, I make shopping easy and reliable across platforms like Amazon, Flipkart, and Instagram.',
        projectType: 'iOS APP',
        roles: ['Online E-commerce Seller'],
      },
      // {
      //   number: '06',
      //   projectName: 'Voistrap',
      //   projectDesc: 'Web app project to give workplace insights using indoor localization, voice and schedule.',
      //   projectType: 'iOS APP',
      //   roles: ['UI Designer', 'Full Stack Developer'],
      // },
      {
        number: '',
        projectName: '',
        projectDesc: '',
        projectType: '',
        roles: [''],
      },
    ];
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.setState(
      {
        vh: Math.round(
          window.document.documentElement.clientHeight * this.pageSplitTimes,
        ),
      },
    );
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const { body, documentElement } = event.srcElement;
    const { vh, slideNumber } = this.state;
    const scrollDistance = Math.max(body.scrollTop, documentElement.scrollTop);
    if (scrollDistance > this.lastScrollTop) {
      this.scrollDirectionDown = true;
    } else {
      this.scrollDirectionDown = false;
    }
    this.lastScrollTop = scrollDistance;
    // console.log(scrollDistance);

    if (Math.floor(scrollDistance / vh) !== slideNumber
      && slideNumber < this.workDetails.length - 1) {
      this.setState({ slideNumber: Math.floor(scrollDistance / vh) });
    } else if (slideNumber === this.workDetails.length - 1
      && (Math.floor(scrollDistance / vh) < slideNumber)) {
      this.setState({ slideNumber: Math.floor(scrollDistance / vh) });
    }
  }

  changeTextContentBasedOnScroll() {
    const { slideNumber } = this.state;
    const refresh = true;
    return (
      <TextContent
        number={this.workDetails[slideNumber].number}
        projectName={this.workDetails[slideNumber].projectName}
        projectDesc={this.workDetails[slideNumber].projectDesc}
        projectType={this.workDetails[slideNumber].projectType}
        roles={this.workDetails[slideNumber].roles}
        refreshToggle={refresh}
      />
    );
  }

  render() {
    return (
      <Container>
        {this.changeTextContentBasedOnScroll()}
        <ImageContent pageSplitTimes={this.pageSplitTimes} />
      </Container>
    );
  }
}

export default Work;
