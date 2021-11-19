import {
  AboutContactContainer,
  AboutHeading,
  AboutHeadingWrapper,
  AboutMainContainer,
  FaqContainer,
  FaqHeading,
  FaqQuestion,
  FaqQuestionsContainer,
  FaqQuestionText,
} from "./styles/AboutStyles";

const About = () => {
  return (
    <AboutMainContainer>
      <AboutHeadingWrapper>
        <AboutHeading>ABOUT</AboutHeading>
      </AboutHeadingWrapper>
      <FaqContainer>
        <FaqHeading>F.A.Q:</FaqHeading>
        <FaqQuestionsContainer>
          <br />
          <b>Question: </b>
          <p1>Can i sing up without my personal infomation?</p1>
          <br />
          <b>Awnser: </b>
          <p1>
            Yea, just use something that looks like an email and use a random
            password, but remember you can't recover it.
          </p1>
          <br />
          <br />
          <b>Question: </b>
          <p1>What is this platform?</p1>
          <br />

          <b>Awnser: </b>
          <p1>
            This is a personal project that replicates functionality of a social
            media.
          </p1>
          <br />
          <br />
          <b>Question: </b>
          <p1>Is this project finished?</p1>
          <br />
          <b>Awnser: </b>
          <p1>
            Main functionality is finished, there are a few things to tweak and
            fix, but yes, the majority is finished.
          </p1>
        </FaqQuestionsContainer>
      </FaqContainer>
      <AboutContactContainer>
        <AboutHeading style={{ marginTop: "1em" }}>Contact</AboutHeading>
        <br />
        <b>Email: </b>
        <p1>scrapironscarecrowdumdum@gmail.com</p1>
        <br />
        <b>Github: </b>
        <p1>moki-moki</p1>
      </AboutContactContainer>
    </AboutMainContainer>
  );
};

export default About;
