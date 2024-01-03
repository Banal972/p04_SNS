import { ObjectId } from "mongodb";
import { connectDB } from "../../../utils/database";

export default async function handler(req,res) {
    
    const db = (await connectDB).db('sns');
    const post = await db.collection('post');
    const like = await db.collection('like');

    if(req.method == "POST"){

        const {_id,user} = req.body;

        // 유저가 좋아요 했는지 가져오기
        const getlike = await like.findOne({user});

        if(getlike &&getlike.like.includes(_id)){

            const insert = await like.updateOne(
                {user},
                {$pull : {like : _id}}
            );

            const add = await post.updateOne(
                {_id : new ObjectId(_id)},
                {$inc : { like : -1}}
            )

            // 바뀐 좋아요 가져오기
            const likeGet = await post.findOne({_id : new ObjectId(_id)});

            if(insert && add) return res.status(200).json({
                suc : true, 
                type : "update",
                like : likeGet.like
            });


        }else{

            const insert = await like.updateOne(
                {user},
                {$addToSet : {like : _id}},
                {upsert : true}
            );

            const add = await post.updateOne(
                {_id : new ObjectId(_id)},
                {$inc : { like : 1}}
            )

            // 바뀐 좋아요 가져오기
            const likeGet = await post.findOne({_id : new ObjectId(_id)});

            if(insert && add) return res.status(200).json({
                suc : true, 
                type : "insert",
                like : likeGet.like
            });

        }

        /* if(getlike.length <= 0){

            const insert = await like.insertOne({user, like : [_id]});
            const add = await post.updateOne(
                {_id},
                {$inc : { like : 1}}
            )

            if(insert & add){
                return res.status(200).json({suc : true, type : "insert"});
            }

        }else{
            const update =  await like
                .updateOne(
                    {user},
                    {$pull : {like : _id}}
                );

            const remove = await post.updateOne(
                {_id},
                {$inc : { like : -1}}
            )

            if(update & remove){
                return res.status(200).json({suc : true, type : "update"});
            }

        } */
        

    }

}