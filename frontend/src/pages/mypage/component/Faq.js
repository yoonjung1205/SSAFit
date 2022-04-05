import { Accordion } from 'react-bootstrap';
import '../scss/Faq.scss'

const Faq = () => {

  return (
    <div className='mypage-faq'>
      <h3>자주 묻는 질문</h3>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>SSAFit은 어떤 서비스를 제공하나요?</Accordion.Header>
          <Accordion.Body className='accordion-content'>
            <p>SSAFit은 총 3개의 서비스를 제공하고 있습니다.</p>
            <p>* 신체 맞춤 옷 추천 서비스</p>
            <p>* 취향 맞춤 옷 추천 서비스</p>
            <p>* 상황 맞춤 코디 추천 서비스</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>신체 맞춤 옷과 취향 맞춤 옷을 어떻게 확인할 수 있나요?</Accordion.Header>
          <Accordion.Body className='accordion-content'>
            <p>로그인 후, RECOMMEND 페이지에서 확인할 수 있습니다.</p>
            <p>RECOMMEND에서 신체 맞춤 옷과 취향 맞춤 옷을 선택할 수 있고,</p>
            <p>취향 맞춤 옷을 선택하면 색, 스타일, 종류별로 각각 옷을 추천받을 수 있습니다.</p>
            <p>* 신체 맞춤 옷</p>
            <p>&emsp;• 로그인한 유저의 신체 정보를 바탕으로 옷을 추천해줍니다.</p>
            <p>* 취향 맞춤 옷</p>
            <p>&emsp;• 로그인한 유저가 봤던 옷들의 기록과 좋아요를 누른 옷들의 정보를 바탕으로 옷을 추천해줍니다.</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>상황 맞춤 코디는 어떻게 확인할 수 있나요?</Accordion.Header>
          <Accordion.Body className='accordion-content'>
            <p>로그인 후, TPO 페이지에서 확인할 수 있습니다.</p>
            <p>각각의 상황을 선택하면, 그 상황에 어울리는 코디를 추천받을 수 있습니다.</p>
            <p>각각의 코디를 '좋아요'나 '별로에요' 버튼을 통해 저장할 수 있고,</p>
            <p>'넘어갈게요' 버튼을 통해 다음 코디를 추천받을 수 있습니다.</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>추천 결과가 계속 달라진다면, 맘에 드는 상품들은 어떻게 다시 조회하나요?</Accordion.Header>
          <Accordion.Body className='accordion-content'>
            <p>각 옷 상품에 대해 '좋아요' 버튼이 구비되어있고, 각 코디 상품은 '좋아요'와 '별로에요' 버튼이 구비되어있습니다.</p>
            <p>'좋아요' 버튼을 누른 상품들은 MYPAGE의 <span>찜한 옷</span>, <span>찜한 코디</span>에서 언제든지 조회할 수 있습니다.</p>
            <p>MYPAGE의 <span>최근에 본 상품</span>을 통해 최근 봤던 상품 역시 조회할 수 있습니다.</p>
            <p>또한, 원하는 상품을 SEARCH 기능을 통해 검색 후 조회할 수 있습니다.</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>소셜 로그인으로 회원가입 시, 앞의 언급했던 서비스들 모두 이용이 가능한가요?</Accordion.Header>
          <Accordion.Body className='accordion-content'>
            <p>소셜 로그인 시 개인의 신장, 몸무게와 같은 개인 정보를 입력할 수 있는 페이지로 리다이렉트 됩니다.</p>
            <p>이후 개인 정보를 입력해야 회원가입이 되기 때문에, 일반 로그인과 마찬가지로 똑같은 서비스를 이용할 수 있습니다. </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Faq;