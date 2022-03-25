import { Accordion } from 'react-bootstrap';
import '../scss/faq.scss'
import { faqs } from '../data';

const faq = () => {

  return (
    <div className='mypage-faq'>
      <h3>자주 묻는 질문</h3>
      <Accordion>
        {faqs.map((faq, idx) => (
        <Accordion.Item eventKey={String(idx)} key={idx}>
          <Accordion.Header>{faq.title}</Accordion.Header>
          <Accordion.Body className='accordion-content'>{faq.content}</Accordion.Body>
        </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default faq;