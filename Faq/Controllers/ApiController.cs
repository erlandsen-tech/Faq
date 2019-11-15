using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Faq.Models;
using Microsoft.AspNetCore.Mvc;

namespace Faq.Controllers
{
    public class ApiController : Controller
    {
        private readonly BLL bll = new BLL();

        [HttpPost]
        public int saveQ([FromBody] Question question)
        {
            return bll.AddQuestion(question);
        }

        [HttpGet]
        public List<QuestionWithAnswers> gQ()
        {
            return bll.GetQuestionList();
        }
        [HttpGet]
        public List<QuestionWithAnswers> getByTerm(string term)
        {
            return bll.getByTerm(term);
        }
        [HttpGet]
        public QuestionWithAnswers getById(int id)
        {
            return bll.getById(id);
        }
        [HttpPost]
        public int Vote([FromBody] Vote vote)
        {
            return bll.vote(vote);
        }
    }
}