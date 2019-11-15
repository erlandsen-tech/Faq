using Faq.Data;
using Faq.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Faq
{
    public class BLL
    {
        public int AddQuestion(Question question)
        {
            using var db = new FaqDatabase();
            try
            {
                var q = new dbQuestion();
                q = convertQ(question);
                db.Questions.Add(q);
                return db.SaveChanges();
            }
            catch (NullReferenceException e)
            {
                return 0;
            }
        }
        public List<QuestionWithAnswers> GetQuestionList()
        {
            using var db = new FaqDatabase();
            var dbQList = db.Questions.ToList();
            return convertListOfQ(dbQList);
        }
        public List<QuestionWithAnswers> getByTerm(string term)
        {
            using var context = new FaqDatabase();
            var results = context.Questions
                .Where(q => q.Body.Contains(term)
                || q.Answer.Contains(term)
                || q.Title.Contains(term))
                .ToList();
            return convertListOfQ(results);
        }
        public QuestionWithAnswers getById(int id)
        {
            using var context = new FaqDatabase();
            var result = context.Questions.Find(id);
            return convertDbQ(result);
        }

        public int vote(Vote vote)
        {
            using var context = new FaqDatabase();
            if (vote.vote == 1 || vote.vote == -1)
            {
                var question = context.Questions.Find(vote.id);
                if (question != null)
                {
                    question.Points += vote.vote;
                    int result = context.SaveChanges();
                    return result;
                }
            }
            return 0;
        }

        //Internal static methods
        //TODO error handling
        private static List<QuestionWithAnswers> convertListOfQ(List<dbQuestion> dbQs)
        {
            var qList = new List<QuestionWithAnswers>();
            foreach (dbQuestion dbq in dbQs)
            {
                var q = convertDbQ(dbq);
                qList.Add(q);
            }
            return qList;
        }
        private static dbQuestion convertQ(Question question)
        {
            var dbq = new dbQuestion
            {
                Answer = "",
                Body = question.body,
                Category = question.category,
                Email = question.email,
                Name = question.name,
                Title = question.title,
                Points = 0
            };
            return dbq;
        }
        private static QuestionWithAnswers convertDbQ(dbQuestion dbq)
        {
            var q = new QuestionWithAnswers
            {
                Id = dbq.Id,
                Answer = dbq.Answer,
                Body = dbq.Body,
                Category = dbq.Category,
                Email = dbq.Email,
                Name = dbq.Name,
                Points = dbq.Points,
                Title = dbq.Title
            };
            return q;
        }
    }
}
