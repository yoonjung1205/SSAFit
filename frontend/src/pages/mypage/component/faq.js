import { Accordion } from 'react-bootstrap';
import '../scss/faq.scss'

const faq = () => {
  const faqs = [
    { title: '1자주 묻는 질문의 제목을 여기 쓴다.',
      content: '1자주 묻는 질문의 답변은 여기에 쓴다.'
    },
    { title: '2자주 묻는 질문의 제목을 여기 쓴다.',
      content: '2자주 묻는 질문의 답변은 여기에 쓴다.'
    },
    { title: '3자주 묻는 질문의 제목을 여기 쓴다.',
      content: '3자주 묻는 질문의 답변은 여기에 쓴다.'
    },
    { title: '4자주 묻는 질문의 제목을 여기 쓴다.',
      content: '4자주 묻는 질문의 답변은 여기에 쓴다.'
    },
    { title: '5자주 묻는 질문의 제목을 여기 쓴다.',
      content: '5자주 묻는 질문의 답변은 여기에 쓴다.'
    }
  ]
  return (
    <div className='mypage-faq'>
      <h3>자주 묻는 질문</h3>
      <Accordion defaultActiveKey='0'>
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